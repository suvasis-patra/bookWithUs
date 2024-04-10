interface ApiResponseProps {
  statusCode: number;
  data: any;
  message: string;
}

export interface UserDetailSchema {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken?: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
