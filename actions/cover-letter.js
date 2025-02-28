"use server"

import { auth } from "@clerk/nextjs/server"
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"

})
export async function generateCoverLetter(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User Not Found")


    const prompt = `
        Write a professional cover letter for a ${data.jobTitle} position at ${data.companyName
        }.
        
        About the candidate:
        - Industry: ${user.industry}
        - Years of Experience: ${user.experience}
        - Skills: ${user.skills?.join(", ")}
        - Professional Background: ${user.bio}
        
        Job Description:
        ${data.jobDescription}
        
        Requirements:
        1. Use a professional, enthusiastic tone
        2. Highlight relevant skills and experience
        3. Show understanding of the company's needs
        4. Keep it concise (max 400 words)
        5. Use proper business letter formatting in markdown
        6. Include specific examples of achievements
        7. Relate candidate's background to job requirements
        
        Format the letter in markdown.
      `;

    try {
        const result = await model.generateContent(prompt)
        const content = result.response.text().trim();

        const coveLetter = await db.coveLetter.create({
            data: {
                content,
                jobDescription: data.jobDescription,
                companyName: data.companyName,
                jobTitle: data.jobTitle,
                status: "completed",
                userId: user.id,

            }
        })
    } catch (error) {
        console.error("error while genrating cover-letter", error.message)
        throw new Error("Failed to generate CoverLetter")
    }

}


export async function getCoverLetters() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User Not Found")

        return await db.coveLetter.findMany({
            where:{
                userId:user.id
            },
            orderBy:{
                createdAt:"desc",
            }
        })
}



export async function getCoverLetter(id) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User Not Found")

        return await db.coveLetter.findUnique({
            where:{
                id,
                userId:user.id
            },
            
        })
}


export async function deleteCoverLetter(id){
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User Not Found")


        return await db.coveLetter.delete({
            where:{
                id,
                userId:user.id
            }
        })

}