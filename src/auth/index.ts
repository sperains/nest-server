export enum IdentityType {
  Account = 'Account',
  Weixin = 'Weixin',
  Weibo = 'Weibo',
}

export type AuthPayload = {
  username: string;
  sub: string | number;
};
