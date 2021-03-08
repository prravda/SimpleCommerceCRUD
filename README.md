# SimpleCommerceCRUD
`TypeScript`, `NestJS`, `Sequelize` 를 통해 명세사항에 맞는 RESTFUL API 를 구현하였습니다.

---
# 각 Directory 에 대한 설명
## 공통
- abstract class 를 통해 서로간의 연결고리를 느슨하게 만들면서 dependency injection 을 시도하였습니다.
- repository layer 에 있는 method 들을 통해 세부 과정들을 처리하며, service logic 에서는 repository layer logic 들을 실행하고, 에러가 발생할 경우 error handling 만을 진행할 수 있도록 관심사를 분리시켰습니다.
- 크게 4개의 domain, `coupon`, `user`, `order`, 그리고 `auth` 로 이루어져 있습니다.
## coupon
- coupon 의 상태를 couponTypes 라는 별도의 table 을 만들었습니다.
- coupon 은 `absolute` 와 `percentage` 라는 `discount_type` 을 가지도록 설계하였습니다.
  - `absolute` 의 경우는 말 그대로 n원만큼의 할인을 실행하는 type 입니다.
  - `percentage` 도 말 그대로 n% 만큼의 할인을 실행하는 type 입니다.
  - `discount_value` 에는 n 값을 넣어주었습니다.
  - 이 둘을 조합하여 쿠폰을 적용한 가격 산정이 조금 편할 수 있도록 구성하였습니다. 
## order
- order 중에서, 중복 적용이 가능한 주문건인지 또한 명시하기 위해 `redundant` 라는 column 을 만들었습니다.
- order 의 상태도 비슷하게 orderStatus 라는 별도의 table을 만들어 확장성을 향상할수있도록 시도하였습니다.
  - `orderStatus` 에는 일단 `accepted`, `rejected`, `completed` 의 3가지 type을 상정 중이었습니다. 

## coupon and order
- 그리고 coupon 과 order 전부 다양한 경우가 많아질 수 있기 때문에 `conditional(if)` 를 통해 처리하기보다는 `switch / case` 를 통해 처리하려고 하였습니다. 

## auth 
- `jwt` & `passport` 를 통한 validation, validation strategy 기능을 구현하였습니다.
- `user` repository 에서 담당하는 기능에 validation 이 붙었기 때문에 `user` 의 `service logic` 을 DI 하는 공식문서의 recipe 와 비슷하게 구현하였습니다.

## users
- 사용자의 생성 및 조회와 관련된 repository 입니다. `auth` 에서 사용할 method 들을 만든 뒤 `auth directory` 에 DI 를 진행하였습니다. 

---
- main branch 에서 merge & PR 을 통해 작업하다가 원하는 사항을 구현하기 힘들어 구조를 변경하였습니다.
- 변경한 구조는 refactor-simplifyTableStructure 에 적용되어있습니다.
# Braches
## 개요
- 원래는 `main` branch 에 각 feature 별로 branch 를 생성하고 그 branch 를 PR 하는 형식으로 작업을 하였습니다.
- 그러나 확장성을 고려해 설계한 table structure 를 기반으로 method 들을 작성하고 처리하기가 어려워 마지막에 구조를 변경하였습니다.
- 변경한(간소화한...) 구조는 `refactor-simplifyTableStructure` 에 적용되어있습니다.

## Branch - main
- 가장 큰 차이는 `order` 와 `coupoun` domain 과 관련한 table structure 입니다.
- `order` domain 은 `orderStatus`, `product`, 그리고 `order` entity 로 구성되어있습니다.
- `product` 라는 structure 를 만들어 분리한 이유는 다음과 같습니다.
  - order 는 주문이 완료된 건들에 대한 기록들을 보존하고 관리하는 차원에서 존재하는 것이라고 간주했습니다.
  - product 는 사용자가 주문한 제품들에 대한 기록들을 보존하고 관리하는 차원에서 존재하는 것이라고 간주했습니다.
  - 그렇기에 관심사가 다소 다른 이 두 entity 를 구분하는 시도를 했습니다.
- `coupon` 또한 `coupon`, `couponStatus`, 그리고 `couponUUID` 라는 entity 로 구성되어있습니다.
- `coupon` domain 을 이렇게 분리한 이유는 다음과 같습니다.
  - `coupon` entity 에선 정말 순수하게 coupon 그 자체가 가지고 있는 정보만을 담으려 시도했었습니다.
    - 예를 들면 쿠폰의 사용여부(`used`) 등의 정보입니다.
  - `couponUUID` 는 coupon 그 자체가 가지고 있는 정보가 아니라 또 다른 domain / entity 와 연관된 정보들,
  - 그러나까 `coupon` entity 에 담기지 않는 나머지 정보들을 담으려 시도했었습니다.
    - 예를 들면 쿠폰의 사용자(`user_id`) 나 쿠폰이 적용된 주문 (`order_id`) 등이 그 정보였습니다.
    - 굳이 UUID serial number 를 여기다 담은 이유는, 혹시라도 생성되는 UUID 가 겹치는 것에 대비하기 위해서였습니다.
      - 해당 table 에서 auto-increment 속성으로 증가하는 primary key 인 `id` 를,
      - `coupon` table 의 `uuid_id` 와 relation 시키면 겹칠 일이 훨씬 줄어들기 때문입니다.
      - 물론 `uuid` column 에 `UNIQUE` 속성을 할당해 주기도 하였습니다. 
      - 그리고 이런 식으로 진행하면 나중에 쿠폰을 선발급 후지급으로 배포했을 경우에 UUID 를 통해 사용자들에게 고지하기가 편하지 않을까 하는 생각도 있었습니다.

## Branch - refactor-simplifyTableStructure
- 그러나 이렇게 table 을 나누어 놓으니 위에 적은 것처럼 query 와 method 를 연계하기가 어려웠습니다.
- 그래서 일단은 필요한 기능들을 구현할 수 있도록 table 구조를 간소화하였습니다.
  - `order` domain 에서는 `product` 라는 별도의 entity 를 다시 `order` entity 에 포함시켰습니다.
  - `coupon` domain 에서는 `couponUUID` 라는 별도의 entity 를 다시 `coupon` entity 에 포함시켰습니다.
- abstract class 를 통한 느슨한 DI 시도 및 각 domain 의 역할은 똑같습니다. 

## Structures by Branch - with Tree
### Branch - main
```text
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.helper.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt-auth.guard.ts
│   ├── jwt.strategy.ts
│   ├── local-auth.guard.ts
│   └── local.strategy.ts
├── config
│   └── index.ts
├── coupons
│   ├── coupons.abstract.repository.ts
│   ├── coupons.controller.ts
│   ├── coupons.dto.ts
│   ├── coupons.module.ts
│   ├── coupons.providers.ts
│   ├── coupons.repository.ts
│   ├── coupons.service.ts
│   └── entities
│       ├── couponTypes.entity.ts
│       ├── couponUUIDs.entity.ts
│       └── coupons.entity.ts
│           
├── database
│   ├── database.module.ts
│   └── database.providers.ts
├── dotenv-example.md
├── main.ts
├── orders
│   ├── entities
│   │   ├── orderStatus.entity.ts
│   │   ├── orders.entity.ts
│   │   └── products.entity.ts
│   ├── orders.abstract.repository.ts
│   ├── orders.controller.ts
│   ├── orders.dto.ts
│   ├── orders.module.ts
│   ├── orders.repository.ts
│   └── orders.service.ts
└── users
    ├── entities
    │   └── user.entity.ts
    ├── users.abstract.repository.ts
    ├── users.controller.ts
    ├── users.dto.ts
    ├── users.module.ts
    ├── users.repository.ts
    └── users.service.ts
```
### Branch - refactor-simplifyTableStructure
```text
├── app.module.ts
├── app.service.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.helper.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt-auth.guard.ts
│   ├── jwt.strategy.ts
│   ├── local-auth.guard.ts
│   └── local.strategy.ts
├── config
│   └── index.ts
├── coupons
│   ├── coupons.abstract.repository.ts
│   ├── coupons.controller.ts
│   ├── coupons.dto.ts
│   ├── coupons.module.ts
│   ├── coupons.repository.ts
│   ├── coupons.service.ts
│   └── entities
│       ├── couponTypes.entity.ts
│       └── coupons.entity.ts
├── database
│   ├── database.module.ts
│   └── database.providers.ts
├── dotenv-example.md
├── main.ts
├── orders
│   ├── entities
│   │   ├── orderStatus.entity.ts
│   │   └── orders.entity.ts
│   ├── orders.abstract.repository.ts
│   ├── orders.controller.ts
│   ├── orders.dto.ts
│   ├── orders.module.ts
│   ├── orders.repository.ts
│   └── orders.service.ts
└── users
    ├── entities
    │   └── user.entity.ts
    ├── users.abstract.repository.ts
    ├── users.controller.ts
    ├── users.dto.ts
    ├── users.module.ts
    ├── users.repository.ts
    └── users.service.ts
```

---

# 구현하면서 어려웠던 점과 스스로에게 아쉬웠던 점
- 최대한 layer 별로 관심사 분리를 하려 했으나 쉽지 않았습니다.
- DDD 에 익숙하지 못 했기에 적절하게 Domain 분리를 하지 못했습니다.
- Query 와 SQL joinning(eager loading / creating) 에 능숙하지 못해서 method 가 많은 query 를 발송합니다.
- Naming Convention 에 일관성이 없었고, Lint 를 통한 code formatting 을 진행하지 못 했습니다. 
- API 문서를 만들지 못했고, Test Code 자체를 개발하지 못 했습니다.

---

# DB Schema
## 처음 시도
![image DB_Schema_Before]('./public/DB_Schema_Before.png "Schema-BeforeRefactor");

## 재시도
![image DB_Schema_Before]('./public/DB_Schema_After.png "Schema-AfterRefactor");

# UML Draft
![image UML_Draft]('./public/UML_Draft.png "UML_Draft");



