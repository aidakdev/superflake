# Superflake
![official-product-badge](https://img.shields.io/badge/official%20product-wiletki-8877ff)

Superflake is a revolutionary technology based on Twitter's Snowflake created with TypeScript. 

Superflake is generated by concatenating:

- a 42-bit timestamp,
- a 10-bit node ID, and
- a 12-bit sequential number.

By the way, Superflake's default epoch is 1616275800 (March 20, 2021).

## Installation
```
npm i superflake
```

## Example
```ts
import Superflake from 'superflake'

let flake = new Superflake({ nodeId: 1 }).gen()
// => 6925192012375265280
```