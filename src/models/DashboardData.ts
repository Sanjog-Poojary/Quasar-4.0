export interface DashboardData {
    role: 'teacher' | 'student';
    stats: {
        label: string;
        value: string | number;
        trend?: string;
        icon: string;
        color: string;
        bgColor: string;
    }[];
    chartData?: {
        name: string;
        mastery: number;
        engagement: number;
    }[];
    projects: {
        title: string;
        subtitle: string;
        status: string;
        icon: string;
        statusColor?: string;
        statusBg?: string;
    }[];
    activity: {
        user: string;
        action: string;
        time: string;
        avatar: string;
        avatarBg?: string;
    }[];
}
