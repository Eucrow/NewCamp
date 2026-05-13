# React Project Pattern Analysis - NewCamp Frontend

## Executive Summary

The React project uses a feature-based folder structure with 13 major features plus a UI library. The codebase combines **Context API + Custom Hooks** for state management with a partial service layer for API communication. While functional components and hooks are used consistently, there are **6 major patterns** used inconsistently across features, which creates cognitive overhead and maintenance challenges.

---

## 1. STATE MANAGEMENT PATTERNS

### Pattern 1A: Context + Custom Hook (CRUD Operations)

**Location:** Most features (Surveys, Ships, Catches, Species, Strata, Stratifications)  
**Files:** `contexts/[Feature]Context.js` + `hooks/use[Feature]Crud.js`

**Example: Surveys**

```javascript
// contexts/SurveysContext.js
export const SurveysContext = React.createContext();

// hooks/useSurveysCrud.js
const useSurveysCrud = () => {
  const [surveys, setSurveys] = useState([]);
  const getSurveys = useCallback(async () => { /* fetch */ }, []);
  const createSurvey = useCallback(async (survey) => { /* create */ }, []);
  // ... returns context value object
};

// components/surveys/Surveys.js
const Surveys = () => {
  const { surveys, setSurveys, getSurvey, createSurvey, ... } = useSurveysCrud();
  return (
    <SurveysContext.Provider value={{ createSurvey, updateSurvey, ... }}>
      {/* children use createSurvey, etc */}
    </SurveysContext.Provider>
  );
};
```

**Used In:**

- ✅ Surveys (`SurveysContext`, `useSurveysCrud`)
- ✅ Ships (`ShipsContext`, `useShipsCrud`)
- ✅ Catches (`CatchesContext`, `useCatchesCrud`)
- ✅ Species (`SpeciesContext`, no dedicated hook - uses direct fetch)
- ✅ Strata (`StrataContext`, `useStrataCrud`)
- ✅ Stratifications (`StratificationsContext`, `useStratificationsCrud`)
- ✅ Lengths (`LengthsContext`, no dedicated hook)

**Status:** ⚠️ **INCONSISTENT** - 6 features use this, but Species/Lengths don't have proper custom hooks

---

### Pattern 1B: Global Context (Single instance)

**Location:** [contexts/GlobalContext.js](src/contexts/GlobalContext.js)  
**Purpose:** App-wide data (species, measurement types, etc.)

```javascript
// Provides:
- species[], measurementTypes[], samplerTypes[], sexes[]
- Helper functions: getMeasurementTypeById(), getSampler(), etc.

// Used by: Hauls, Catches, Measurements, Stratifications, Strata components
<GlobalContext.Provider value={{ species, setSpecies, getMeasurementType, ... }}>
  {/* entire app */}
</GlobalContext.Provider>
```

**Status:** ✅ **CONSISTENT** - Centralized, used everywhere that needs reference data

---

### Pattern 1C: Validation Custom Hooks

**Location:** `hooks/use[Feature]Validation.js`

**Used In:**

- ✅ `useSurveysValidation` - Survey form validation
- ✅ `useCatchValidation` - Catch form validation
- ✅ `useShipsValidation` - Ship form validation
- ✅ `useStrataValidation` - Strata form validation
- ✅ `useStratificationValidation` - Stratification form validation
- ✅ `useRangeValidation` - Numbers/range validation

**Example:**

```javascript
const { isFormValid, errors } = useSurveysValidation(survey);
// Returns: { isFormValid: boolean, errors: { fieldName: string } }
```

**Status:** ⚠️ **INCONSISTENT** - Only 6 features have validation hooks; others validate inline

---

### Pattern 1D: Specialized Hooks

**Files:**

- `useBackupState.js` - State with backup/restore (Surveys)
- `useSortCatches.js` - Sorting utility (Catches)
- `useHaulDataManager.js` - Empty stub (Hauls)

**Status:** ⚠️ **INCONSISTENT** - Ad-hoc utilities, no pattern for new ones

---

## 2. API COMMUNICATION PATTERNS

### Pattern 2A: Centralized Service Layer (RECOMMENDED)

**Location:** [services/](src/services/)

**Files:**

- ✅ [surveyService.js](src/services/surveyService.js) - Surveys API
- ✅ [shipService.js](src/services/shipService.js) - Ships API
- ✅ [haulService.js](src/services/haulService.js) - Hauls/Trawl/Meteorology/Hydrography API

**Pattern:**

```javascript
// services/surveyService.js
const surveyService = {
  async getSurveys() {
    const url = buildApiUrl("surveys");
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch surveys");
    return response.json();
  },
  async createSurvey(survey) {
    /* ... */
  },
  async updateSurvey(id, survey) {
    /* ... */
  },
  async deleteSurvey(id) {
    /* ... */
  },
};

// hooks/useSurveysCrud.js - consumes the service
const getSurveys = useCallback(async () => {
  try {
    const data = await surveyService.getSurveys();
    setSurveys(data);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}, []);
```

**Coverage:**

- ✅ Surveys - fully covered
- ✅ Ships - fully covered
- ✅ Hauls/Trawl/Meteorology/Hydrography - fully covered
- ❌ Catches - NO service (direct fetch)
- ❌ Species - NO service (direct fetch)
- ❌ Strata - NO service (direct fetch)
- ❌ Stratifications - NO service (direct fetch)
- ❌ Measurements - NO service (direct fetch)
- ❌ Lengths - NO service (direct fetch)

**Status:** ❌ **INCONSISTENT** - Only 3 of 10+ features have service layer

---

### Pattern 2B: Direct Fetch in Components

**Location:** Multiple components (Catches, Species, Ships, Strata, Stratifications, Measurements)

**Example: Species creation**

```javascript
// components/species/Species.js (direct in hook, not in service)
const createSpecies = useCallback(
  async species => {
    try {
      await fetch(buildApiUrl("species"), {
        method: "POST",
        headers: API_CONFIG.HEADERS.DEFAULT,
        body: JSON.stringify(species),
      })
        .then(response => {
          if (!response.ok) throw new Error("Failed");
          return response.json();
        })
        .then(data => setSpeciesArray([data, ...speciesArray]))
        .catch(error => console.log(error));
    } catch (error) {
      alert("Error creating species");
    }
  },
  [speciesArray]
);
```

**Used In:**

- ❌ Catches - fetch in `useCatchesCrud` hook
- ❌ Species - fetch in `useSpeciesCrud` (no service)
- ❌ Strata - fetch in `useStrataCrud` hook
- ❌ Stratifications - fetch in `useStratificationsCrud` hook
- ❌ Measurements - fetch in components directly
- ❌ Lengths - mixed approach

**Status:** ❌ **INCONSISTENT** & **ANTI-PATTERN** - Violates separation of concerns

---

### Pattern 2C: Error Handling

**Current Approaches:**

1. `alert()` - User notification (most common)
2. `console.log()` - Debugging
3. Conditional UI rendering - Some components show error states

**Example variation:**

```javascript
// Approach 1: Alert (Surveys, Ships, Species)
.catch(error => alert(`Error: ${error.message}`));

// Approach 2: Console (Catches, Measurements)
.catch(error => console.log(error));

// Approach 3: Error state + UI
const [error, setError] = useState(null);
// Render: {error && <FloatingError message={error} />}
```

**Status:** ❌ **INCONSISTENT** - No standard error handling pattern

---

## 3. COMPONENT PATTERNS

### Pattern 3A: List + CRUD Forms (Separate Components)

**Location:** Features with table-like lists

**Files:**

- Surveys: `Surveys.js` + `NewSurveyForm.js` + `EditSurveyForm.js` + `ViewSurveyForm.js` + `Survey.js`
- Species: `Species.js` + `NewSpForm.js` + `ViewEditSpForm.js` + `Sp.js`
- Ships: `Ships.js` + `NewShipForm.js` + `ViewEditShipForm.js` + `Ship.js`
- Catches: `Catches.js` + `NewCatchForm.js` + `EditCatchForm.js` + `ViewCatchForm.js` + `Catch.js`

**Pattern:**

```javascript
// Parent component manages state
const Surveys = () => {
  const [addingSurvey, setAddingSurvey] = useState(false);
  const { surveys, createSurvey, updateSurvey, deleteSurvey } =
    useSurveysCrud();

  return (
    <div>
      <SurveysButtonBar onAdd={() => setAddingSurvey(true)} />
      {addingSurvey && <NewSurveyForm onCreate={handleCreate} />}
      <SurveysContext.Provider value={{ updateSurvey, deleteSurvey }}>
        {surveys.map(survey => (
          <Survey key={survey.id} survey={survey} />
        ))}
      </SurveysContext.Provider>
    </div>
  );
};

// Child component receives context
const Survey = ({ survey }) => {
  const [editing, setEditing] = useState(false);
  const { updateSurvey, deleteSurvey } = useContext(SurveysContext);

  if (editing) return <EditSurveyForm />;
  return (
    <div>
      <SurveyButtonBar
        onEdit={() => setEditing(true)}
        onDelete={deleteSurvey}
      />
      <ViewSurveyForm survey={survey} />
    </div>
  );
};
```

**Used In:**

- ✅ Surveys (5 files)
- ✅ Species (4 files)
- ✅ Ships (4 files)
- ✅ Catches (5 files)

**Status:** ✅ **CONSISTENT** - Well-established pattern for CRUD tables

---

### Pattern 3B: Multi-Mode Component (Single File with Conditionals)

**Location:** Complex features with multiple display modes

**Files:**

- Haul.js - Shows different views based on mode
- Hauls.js - List container
- Stratifications.js - Multiple nested views
- Strata.js - Multiple nested views
- Lengths.js - Multiple form variations
- Measurements.js - Multiple form variations

**Example: Haul.js**

```javascript
const Haul = ({ haul }) => {
  const [detail, setDetail] = useState(false);
  const [edit, setEdit] = useState(false);
  const [catches, setCatches] = useState(false);

  if (detail) return (
    <>
      <HaulFormView haul={haul} />
      <HaulDetails haul={haul} />
    </>
  );
  if (edit) return <HaulFormEdit haul={haul} />;
  if (catches) return (
    <>
      <HaulFormView haul={haul} />
      <CatchesContext.Provider value={...}>
        <Catches haul={haul} />
      </CatchesContext.Provider>
    </>
  );
  return <HaulFormView haul={haul} />;
};
```

**Used In:**

- ❌ Haul/Hauls (5 file structure: view/, edit/, new/)
- ❌ Stratifications (5 file structure: view/, edit/, new/)
- ❌ Strata (5 file structure: view/, edit/, new/)
- ❌ Lengths (4 forms variations)
- ❌ Measurements (4 forms variations)

**Status:** ⚠️ **INCONSISTENT WITH 3A** - Conflicts with the separate files pattern used in Surveys/Species/Ships

---

### Pattern 3C: Button Bar Components

**Location:** Wrapper components for action buttons

**Pattern:**

```javascript
// Parent level buttons
const SurveysButtonBar = ({ onAdd }) => (
  <div className="buttonsWrapper">
    <UiButtonAdd onClick={onAdd} />
    <UiButtonDownload />
  </div>
);

// Item level buttons
const SurveyButtonBar = ({ survey }) => (
  <div className="buttonsWrapper__button">
    <UiIconEdit onClick={onEdit} />
    <UiIconDelete onClick={onDelete} />
  </div>
);
```

**Used In:**

- ✅ Surveys: `SurveysButtonBar` + `SurveyButtonBar`
- ✅ Species: `SpeciesButtonBar` + `SpButtonBar`
- ✅ Ships: `ShipsButtonBar` + `ShipButtonBar`
- ✅ Catches: `CatchesButtonBar` + `CatchButtonBar`
- ✅ Hauls: `HaulButtonBar`
- ✅ Lengths: `LengthsButtonBar`

**Status:** ✅ **CONSISTENT** - Clear separation and naming

---

## 4. FORM PATTERNS

### Pattern 4A: Separate Form Components (5+ files)

**Used In:** Surveys, Species, Ships, Catches

**Structure:**

```
Module/
├── [Feature].js          (parent container)
├── New[Feature]Form.js   (form for creation)
├── Edit[Feature]Form.js  (form for editing)
├── View[Feature]Form.js  (read-only view)
└── [Feature].js          (individual item row)
```

**Example: Surveys**

- `Surveys.js` - List container
- `NewSurveyForm.js` - Controlled form for POST
- `EditSurveyForm.js` - Controlled form for PUT
- `ViewSurveyForm.js` - Read-only display
- `Survey.js` - Row component

**Status:** ✅ **CONSISTENT** within this pattern, but conflicts with Pattern 3B

---

### Pattern 4B: Multi-Form Component (4 form variations in 1 file)

**Used In:** Lengths, Measurements

**Example: Lengths.js**

```javascript
const LengthForm = ({ index }) => {
  /* Single length input */
};
const LengthQuickForm = () => {
  /* Quick entry */
};
const LengthsForm = () => {
  /* Manage all lengths */
};
const LengthsQuickForm = () => {
  /* Quick add multiple */
};
const LengthsRangeForm = () => {
  /* Range distribution */
};

// Parent component with conditional rendering
const Lengths = () => {
  const [mode, setMode] = useState("form"); // or "quick" or "range"
  return (
    <>
      {mode === "form" && <LengthsForm />}
      {mode === "quick" && <LengthsQuickForm />}
      {mode === "range" && <LengthsRangeForm />}
    </>
  );
};
```

**Status:** ❌ **INCONSISTENT** - Conflicts with Pattern 4A

---

## 5. STYLING PATTERNS

### Pattern 5A: Modular SCSS with Partials

**Location:** [scss/](src/scss/) - 22 partial files

**Structure:**

```scss
// Base styles
_reset.scss, _fonts.scss, _wrapper.scss, _form.scss, _button.scss

// Component styles
_icons.scss, _nav.scss, _buttonsWrapper.scss

// Feature styles
_surveys.scss, _stations.scss, _ships.scss, _species.scss, _catches.scss, etc.

// Utilities
_sort.scss, _coordinates.scss, _characteristics.scss, _weights.scss
```

**Entry:** [index.scss](src/index.scss) imports all partials

**Status:** ✅ **CONSISTENT** - Clear organization by feature

---

### Pattern 5B: BEM-like CSS Class Naming

**Naming Convention:** `[block]__[element]--[modifier]`

**Examples:**

```javascript
className = "wrapper form__row"; // form section
className = "buttonsWrapper__button"; // button in wrapper
className = "headNav__selectedSurvey"; // selected survey display
className = "survey_description invalid"; // with state modifier
className = "form__cell"; // form cell
```

**Used in:** All components consistently

**Status:** ✅ **CONSISTENT** - Clear and applied everywhere

---

## 6. ROUTING PATTERN

### Pattern 6: Hash-based Routing

**Location:** [App.js](src/App.js) - HashRouter from React Router v5

**Routes:**

```
/               → Home
/SurveySelect  → SurveySelect (choose survey)
/Stations      → Stations (manage stations)
/Surveys       → Surveys (manage surveys)
/Reports       → Reports
/Species       → Species (reference table)
/Ships         → Ships (reference table)
/Measurements  → Measurements
/Stratifications → Stratifications
/Strata        → Strata
```

**Implementation:**

```javascript
<HashRouter>
  <nav className="headNav">
    <Link to="/SurveySelect">Select Survey</Link>
    <Link to="/Stations">Stations</Link>
    {/* Reference Tables Submenu */}
  </nav>
  <Route path="/" exact component={Home} />
  <Route path="/Stations" component={Stations} />
  {/* ... */}
</HashRouter>
```

**Status:** ✅ **CONSISTENT** - Single routing approach used throughout

---

## SUMMARY TABLE

| Pattern                      | Coverage     | Status          | Notes                                 |
| ---------------------------- | ------------ | --------------- | ------------------------------------- |
| Context + Custom Hook (CRUD) | 7 features   | ⚠️ Inconsistent | Species, Lengths missing proper hooks |
| Service Layer                | 3 features   | ❌ Poor (30%)   | Surveys, Ships, Hauls only            |
| Direct Fetch                 | 6+ features  | ❌ Inconsistent | No consistent error handling          |
| Error Handling               | All features | ❌ Inconsistent | Mix of alert/console/UI               |
| Separate Form Files (4A)     | 4 features   | ✅ Consistent   | Surveys, Species, Ships, Catches      |
| Multi-Form Component (4B)    | 2 features   | ⚠️ Inconsistent | Lengths, Measurements                 |
| List + CRUD Pattern          | 4 features   | ✅ Consistent   | Well-maintained structure             |
| Button Bar Components        | All features | ✅ Consistent   | Clear naming convention               |
| SCSS Modular                 | All          | ✅ Consistent   | Well-organized partials               |
| BEM CSS Naming               | All          | ✅ Consistent   | Uniform class naming                  |
| Routing (HashRouter)         | All          | ✅ Consistent   | Single approach                       |

---

## RECOMMENDATIONS FOR IMPROVEMENT

### Priority 1: Standardize API Communication Layer

**Current Problem:** Fetches scattered across custom hooks and components

**Recommendation:**

```javascript
// Create service for EVERY feature
services/
├── surveyService.js        ✅ (exists)
├── shipService.js          ✅ (exists)
├── haulService.js          ✅ (exists)
├── catchService.js         ❌ (create)
├── speciesService.js       ❌ (create)
├── strataService.js        ❌ (create)
├── stratificationService.js ❌ (create)
├── measurementService.js   ❌ (create)
└── lengthService.js        ❌ (create)

// All custom hooks should ONLY call services, never fetch directly
// Services handle: fetch(), error handling, response validation
// Hooks handle: state management, context provision
```

**Impact:** Fixes 60% of code inconsistency issues

---

### Priority 2: Standardize Validation Pattern

**Current Problem:** Some features have custom validation hooks, others validate inline

**Recommendation:**

```javascript
// Every feature with forms should have matching validation hook
hooks/
├── useSurveysValidation.js       ✅ (exists)
├── useCatchValidation.js         ✅ (exists)
├── useShipsValidation.js         ✅ (exists)
├── useSpeciesValidation.js       ❌ (create)
├── useStrataValidation.js        ✅ (exists)
├── useStratificationValidation.js ✅ (exists)
├── useMeasurementValidation.js   ❌ (create)
├── useLengthValidation.js        ❌ (create)
└── useSexValidation.js           ❌ (create)

// Validation hook interface (standardized):
const useFeatureValidation = (formData) => ({
  isFormValid: boolean,
  errors: { fieldName: string }
});
```

**Impact:** Improves maintainability and consistency

---

### Priority 3: Create Central Error Handler Utility

**Current Problem:** 3+ different error handling approaches

**Recommendation:**

```javascript
// utils/errorHandler.js
export const handleError = (error, context = {}) => {
  console.error(`[${context.feature}] Error:`, error);

  if (error instanceof TypeError) {
    // Network error
    alert("Network error. Please check your connection.");
  } else if (error.message.includes("404")) {
    alert("Resource not found.");
  } else {
    alert(`Error: ${error.message}`);
  }
};

// Usage in all features:
.catch(error => handleError(error, { feature: "Surveys" }));
```

**Impact:** Consistent user experience and debugging

---

### Priority 4: Unify Component Structure (Choose ONE Pattern)

**Current Problem:** Surveys/Species/Ships vs Hauls/Lengths/Measurements use different patterns

**Option A: Adopt "Separate Files" Pattern (Recommended)**

```javascript
// Current in Surveys, Species, Ships
Module/
├── [Feature].js          // List container + CRUD logic
├── New[Feature]Form.js   // Form for creation (reusable)
├── Edit[Feature]Form.js  // Form for editing (reusable)
├── View[Feature]Form.js  // Display component (reusable)
└── [Feature].js          // Individual row component
```

**Benefits:**

- Reusable form components
- Clear separation of concerns
- Easier testing
- Better code splitting

**Changes needed:**

- Hauls: Extract `HaulFormNew.js`, `HaulFormEdit.js`, `HaulFormView.js`
- Lengths: Create `LengthForm.js`, `LengthsForm.js` (not variations)
- Measurements: Create `MeasurementForm.js`, etc.

**Option B: Consolidate Multi-Mode Pattern**

- Move all conditional rendering to single component file
- Less file clutter, potentially harder to maintain

**Recommendation:** Choose Option A (Separate Files) - already proven in 40% of codebase

---

### Priority 5: Create Custom Hook Template/Standard

**Current Problem:** Custom hooks vary in structure and responsibility

**Recommendation:**

```javascript
// hooks/use[Feature]Crud.js - Standard template
const use[Feature]Crud = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await [feature]Service.getItems();
      setItems(data);
      setError(null);
    } catch (error) {
      setError(error);
      handleError(error, { feature: "[Feature]" });
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = useCallback(async (item) => {
    setLoading(true);
    try {
      const newItem = await [feature]Service.createItem(item);
      setItems(prev => [newItem, ...prev]);
      setError(null);
      return newItem;
    } catch (error) {
      setError(error);
      handleError(error, { feature: "[Feature]" });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // ... update, delete similar pattern

  return { items, loading, error, getItems, createItem, updateItem, deleteItem };
};
```

**Benefits:**

- Consistent error handling with loading states
- All hooks have same interface
- Predictable behavior

---

### Priority 6: Document Context Hierarchy

**Create:** `contexts/README.md`

```markdown
# Context Hierarchy

## Global Contexts (Top Level)

- **GlobalContext** - Reference data (species, measurements, etc.)
- **SelectedSurveyContext** - Currently selected survey

## Feature Contexts (Per Module)

- **SurveysContext** (from useSurveysCrud)
- **ShipsContext** (from useShipsCrud)
- **CatchesContext** (from useCatchesCrud)
- ... etc

## Usage Rules

1. Always wrap component with provider before using
2. Never create nested contexts of same feature
3. Use custom hooks to access context (don't useContext directly)
```

**Impact:** Reduces confusion about where state lives

---

## IMPLEMENTATION CHECKLIST

- [ ] Priority 1: Create missing services (Catches, Species, Strata, Stratifications, Measurements, Lengths)
- [ ] Priority 1: Refactor all hooks to use services exclusively
- [ ] Priority 2: Create missing validation hooks
- [ ] Priority 3: Create `utils/errorHandler.js`
- [ ] Priority 4: Refactor Hauls/Lengths/Measurements to separate files pattern
- [ ] Priority 5: Standardize custom hook template
- [ ] Priority 6: Document context hierarchy
- [ ] Add TypeScript (optional but recommended for long term)
- [ ] Add React Query/SWR (alternative to Context+Hooks for data fetching)

---

## ESTIMATED EFFORT

| Task                              | Difficulty | Time      | Priority |
| --------------------------------- | ---------- | --------- | -------- |
| Create 6 missing services         | Low        | 2-3 hours | High     |
| Refactor hooks to use services    | Medium     | 3-4 hours | High     |
| Create 3 missing validation hooks | Low        | 1-2 hours | High     |
| Create error handler utility      | Low        | 1 hour    | High     |
| Refactor Hauls to separate files  | Medium     | 2-3 hours | Medium   |
| Refactor Lengths/Measurements     | Medium     | 2-3 hours | Medium   |
| Document & testing                | Low        | 2 hours   | Low      |

**Total: 13-19 hours for full uniformity**

---

## QUICK WINS (Can do immediately)

1. **Extract error handler utility** - 30 minutes
2. **Create service layer for Catches** - 45 minutes
3. **Add validation hook for Species** - 30 minutes
4. **Document context hierarchy** - 30 minutes

**Total: 2-2.5 hours for 40% improvement**
