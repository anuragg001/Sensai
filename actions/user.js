"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";


export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unatuhrozied")

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User doesn't exist");


    try {
        const result = await db.$transaction(
            async (tx) => {
                // find if the industry exist 
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry
                    }
                })
                // if industry  doesn't exist ,create it with default value - will replace it later with ai
                if (!industryInsight) {
                    const insights = await generateAIInsights(data.industry);

                    industryInsight = await db.industryInsight.create({
                        data: {
                            industry: data.industry,
                            ...insights,
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        }
                    })
                }
                //update the user 
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills
                    }
                })
                return { updatedUser, industryInsight };
            }, {
            timeout: 10000 // default:5000
        }
        );
        return result.updatedUser;
    } catch (error) {
        console.error("Error while updating user and Industry", error.message);
        throw new Error("Failed to update profile" + error.message)

    }
}

// we'll use transaction functinality of prisma , that ensures all three actions are performed ,if not give error 

export async function getOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User is not valid")

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            select: {
                industry: true
            }
        })
        return {
            isOnboarded: !!user?.industry
        }
    } catch (error) {
        console.error("Error checking onboarding status:", error.message)
        throw new Error("failed to check onboarding status")
    }
}