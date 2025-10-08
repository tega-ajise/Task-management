export interface JwtVerificationResponse {
  userId: string;
  email: string;
  role: string;
  organization: string;
}

export interface JwtPayload {
  username: string;
  sub: string;
  role: string;
  organization: string;
}

export interface JwtCreationResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
}
