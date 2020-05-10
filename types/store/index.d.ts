export declare type Single = "Single"
export declare type Undisclosed = "Undisclosed"
export declare type Unset = "Unset"

export declare type MartialStatus = Single | Undisclosed | Unset

export declare type Profile = {
  age: number,
  martialStatus: MartialStatus
}

export declare type User = {
  username: string,
  id: number,
  profile: Profile
}

export declare type State = {
  counter: number,
  users: User[]
}
