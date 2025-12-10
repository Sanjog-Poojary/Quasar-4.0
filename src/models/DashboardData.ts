import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDashboardData extends Document {
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

const DashboardDataSchema: Schema = new Schema({
    role: { type: String, required: true, enum: ['teacher', 'student'] },
    stats: [{
        label: String,
        value: Schema.Types.Mixed,
        trend: String,
        icon: String,
        color: String,
        bgColor: String
    }],
    chartData: [{
        name: String,
        mastery: Number,
        engagement: Number
    }],
    projects: [{
        title: String,
        subtitle: String,
        status: String,
        icon: String,
        statusColor: String,
        statusBg: String
    }],
    activity: [{
        user: String,
        action: String,
        time: String,
        avatar: String,
        avatarBg: String
    }]
});

// Prevent overwriting model during hot reload
const DashboardData: Model<IDashboardData> = mongoose.models.DashboardData || mongoose.model<IDashboardData>('DashboardData', DashboardDataSchema);

export default DashboardData;
