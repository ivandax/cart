# Shopping Cart Application

A production-oriented React shopping cart implementation demonstrating clean architecture, extensible design patterns, and separation of concerns.

## Quick Start

```bash
yarn install
yarn dev
```

## Architecture Overview

This application showcases a scalable shopping cart system built with React + TypeScript. The architecture separates concerns into distinct layers:

### 1. **Domain Layer** (`src/domain/types.ts`)
Defines core business entities with strong typing:
- **Product**: Catalog items with pricing and metadata
- **DeliveryCostRule**: Threshold-based shipping tiers
- **Offer**: Extensible discount system using function-based calculations

### 2. **Business Logic Layer** (`src/hooks/useBasket.ts`)

The `useBasket` hook encapsulates all basket operations:

#### Key Features:
- **Item Management**: `add()` and `remove()` operations with state management
- **Flexible Pricing**: 
  - Applies delivery cost rules based on spending thresholds
  - Integrates special offers dynamically
  - Returns detailed breakdown: `getSubtotalsAndDiscounts()` returns subtotal, discounts, and total

#### Design Decisions:
1. **Rule Sorting for Safety**: Delivery rules are sorted by threshold regardless of config order, making the system resilient to misconfiguration
2. **Strategy Pattern for Offers**: Offers use function-based discount logic, allowing complex calculations without hardcoding
3. **Single Responsibility**: Hook handles cart logic; components handle presentation

### 3. **Configuration Layer** (`src/persistence/config.ts`)

Centralized configuration enables easy customization without code changes:
- Product catalog
- Delivery cost rules (ordered ascending, processed in descending order for logic safety)
- Special offers with custom discount functions

- This would represent the layer of the app that communicates with external services, like a REST API.

### 4. **Presentation Layer**

#### **ProductCatalog Component**
- Grid-based product display with responsive layout
- Accepts catalog and callback for decoupling from business logic
- Color attribute enables dynamic styling

#### **OrderSummary Component**
- Displays itemized breakdown with quantities
- Shows applied discounts prominently in green
- Displays delivery cost based on subtotal tier
- Remove item functionality

#### **Responsive Design**
- Desktop: Two-column layout (products left, basket right)
- Mobile: Stacked layout (products top, basket bottom)
- CSS Grid for flexible product display

## Business Logic Examples

### Delivery Cost Calculation
```
Subtotal $30 → $4.95 delivery (under $50)
Subtotal $60 → $2.95 delivery ($50-89.99)
Subtotal $95 → $0 delivery ($90+)
```

### Offer Application
```
2x Red Widget @ $32.95:
Regular: $65.90
Discount: -$16.48 (second at half price)
Final: $49.42
```

## Preview

![Application View](./view.JPG)
