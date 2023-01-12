// @flow

export type Trigger = $Exact<{
  +name: string,
  +severity: string,
  +count: number
}>;
