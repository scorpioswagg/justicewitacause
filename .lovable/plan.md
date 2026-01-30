
# Fix Button Styling & Submission RLS Error

## Summary
This plan addresses two issues:
1. Inconsistent button colors across the site
2. RLS policy violation error when submitting reports

---

## Part 1: Standardize Button Colors

### Changes to `src/pages/Index.tsx`
Make all buttons use the accent color scheme for consistency:

**Hero section buttons (lines 58-72):**
- "Submit a Concern" - Keep as `bg-accent` (already correct)
- "Explore Resources" - Change from transparent outline to `bg-accent`
- "Join the Community" - Change from transparent outline to `bg-accent`

**CTA section buttons (lines 140-151):**
- "Submit a Concern" - Keep as `bg-accent` (already correct)
- "Learn More" - Change from `variant="outline"` to `bg-accent`

All buttons will use: `bg-accent hover:bg-accent/90 text-accent-foreground`

---

## Part 2: Fix RLS Submission Error

### Root Cause
The current code does `.insert().select()` which requires SELECT permissions. Anonymous users can INSERT but cannot SELECT (only admins can view submissions).

### Solution
Modify the submission code in `src/pages/Submit.tsx` to:
1. Perform the INSERT without chained `.select()`
2. Generate the reference ID client-side (matching the database format: `JWC-YYYYMMDD-uuid8chars`)

This avoids needing SELECT permissions while still giving users their reference ID.

### Code Change (lines 134-160)
Replace the insert logic to:
```typescript
// Generate reference ID client-side
const submissionId = crypto.randomUUID();
const referenceId = `JWC-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${submissionId.slice(0,8)}`;

// Insert without .select()
const { error: submissionError } = await supabase
  .from("submissions")
  .insert({
    id: submissionId,
    reference_id: referenceId,
    // ... other fields
  });
```

---

## Files to Modify
1. `src/pages/Index.tsx` - Update button styling
2. `src/pages/Submit.tsx` - Fix submission logic to avoid SELECT requirement

---

## Technical Notes
- The database trigger for `generate_reference_id` will still run, but we provide the values client-side to avoid conflicts
- The RLS policies remain secure: anyone can INSERT, only admins can SELECT
- No database changes required
