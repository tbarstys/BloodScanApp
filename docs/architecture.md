# LabLens Architecture

```mermaid
flowchart TD
  A[User uploads PDF/image/manual entry] --> B[Client Preprocessing]
  B --> C[Tesseract Worker Pool]
  C --> D[Parsed Text]
  D --> E[Table Extraction & Normalization]
  E --> F[Rules Engine]
  F --> G[Advice Renderer]
  G --> H[Local Persistence (IndexedDB/sql.js)]
  E --> I[Optional LLM Normalization (off by default)]
  subgraph Browser
    B
    C
    D
    E
    F
    G
    H
  end
  subgraph Optional Cloud Services
    I
  end
```
