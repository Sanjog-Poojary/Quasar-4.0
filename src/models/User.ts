import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string;
    name: string;
    role: 'teacher' | 'student';
    avatar: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['teacher', 'student'] },
    avatar: { type: String, required: true }
});

// Prevent overwriting model during hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
