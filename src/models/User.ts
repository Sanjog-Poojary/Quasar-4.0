export interface User {
    email: string;
    password?: string;
    name: string;
    role: 'teacher' | 'student';
    avatar: string;
}
