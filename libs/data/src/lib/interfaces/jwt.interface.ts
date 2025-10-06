export interface JwtVerificationResponse {
  userId: string;
  email: string;
  role: string;
}

export interface JwtPayload {
  username: string;
  sub: string;
  role: string;
}

export interface JwtCreationResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
}
