const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed(){
    const john = await prisma.user.create({
        data: {
            username: 'john',
            passwordHash: '$2y$10$Sqz2rz0MtpkUiF72AE4VeeZdHcbs1etz4mGQnYQ/NagY/Rw8bkcVq' 
        }
    })

    await Promise.all(
        getPosts().map((post) => {
            const data = {userId: john.id, ...post}
            return prisma.post.create({data})
        })
    )
}

seed()

function getPosts() {
    return [
        {
            title: 'JavaScript Performance Tips',
            body: `We will look at 10 simple tips and tricks to increase the speed of your code when writing JS`,
        },
        {
            title: 'Tailwind vs. Bootstrap',
            body: `Both Tailwind and Bootstrap are very popular CSS frameworks. In this article, we will compare them`,
        },
        {
            title: 'Writing Great Unit Tests',
            body: `We will look at 10 simple tips and tricks on writing unit tests in JavaScript`,
        },
        {
            title: 'What Is New In PHP 8?',
            body: `In this article we will look at some of the new features offered in version 8 of PHP`,
        },
    ]
}