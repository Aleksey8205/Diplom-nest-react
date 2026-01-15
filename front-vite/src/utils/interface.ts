
export interface UserInfo {
    id: number;
    email: string;
    name: string;
    role: string;
  }
  
  export interface AuthState {
    user: UserInfo | null;
    authenticated: boolean;
    loading: boolean;
    errorMessage: string | null;
  }
  
  export interface RootState {
    auth: AuthState;
  }