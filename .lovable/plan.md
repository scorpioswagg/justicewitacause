

# Fix Button Styling and Submission RLS Error

## Summary
Two fixes are needed:
1. Standardize all buttons to use the accent color scheme
2. Fix the submission form to avoid requiring SELECT permissions

---

## Part 1: Standardize Button Colors

### File: `src/pages/Index.tsx`

**Hero Section (lines 63-72):**
Change "Explore Resources" and "Join the Community" buttons from transparent to accent:

```typescript
// Before
className="w-full sm:w-auto bg-transparent border-2 border-primary-foreground/50 text-primary-foreground..."

// After
className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
```

**CTA Section (line 147):**
Change "Learn More" button from outline to accent:

```typescript
// Before
variant="outline" className="... border-primary-foreground/30 text-primary-foreground..."

// After
className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
```

---

## Part 2: Fix RLS Submission Error

### File: `src/pages/Submit.tsx`

**Root Cause:** The current code uses `.insert().select()` which requires SELECT permissions that only admins have.

**Solution:** Generate the ID and reference_id client-side, then insert without `.select()`:

```typescript
// Generate IDs client-side
const submissionId = crypto.randomUUID();
const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const referenceId = `JWC-${today}-${submissionId.slice(0, 8)}`;

// Insert without .select()
const { error: submissionError } = await supabase
  .from("submissions")
  .insert({
    id: submissionId,
    reference_id: referenceId,
    full_name: data.fullName || null,
    property_name: data.propertyName,
    // ... other fields
  } as any);

if (submissionError) throw submissionError;

// Use submissionId and referenceId directly for file uploads and success message
```

This avoids the SELECT permission check while still providing users with their reference number.

---

## Files to Modify
1. `src/pages/Index.tsx` - Update 3 buttons to use accent styling
2. `src/pages/Submit.tsx` - Generate IDs client-side, remove `.select()`

---

## Technical Notes
- The database trigger `generate_reference_id` will be bypassed since we provide the values
- No database changes required
- RLS policies remain unchanged and secure

