import prisma from "@/lib/prisma"

export const getSyllabus = async () => {
    try {
        const syllabus = await prisma.subjects.findMany({
            where : {
                deleteStatus : 0, status: 1
            },
            select : 
            {
                id: true, subjectName: true, shortUrl: true,
                chapters: {
                    where : {
                        deleteStatus : 0 , status: 1
                    },
                    select : {
                        id: true, chapterName: true, shortUrl: true, 
                        Classes : {
                            select : {
                                id: true, className: true, shortUrl: true
                            }
                        },
                        topics : {
                            where : {
                                deleteStatus : 0, status : 1
                            },
                            select : {
                                id: true, topicName: true, shortUrl: true
                            }
                        }
                    }
                }
            }
        })
        return syllabus
    } catch (error) {
        throw error
    }
}