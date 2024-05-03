import clientPromise from "../../../../libs/mongoConnect";
import mongoose from "mongoose";
import { UserInfo } from "../../../models/UserInfo";
import NextAuth, { getServerSession } from "next-auth";
import { User } from "../../../models/User";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { authOptions } from "../../../../libs/route";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
