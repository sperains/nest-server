import { Prisma, PrismaClient } from '@prisma/client';

/**
 * 通过prisma生成数据库基础数据
 */

const prisma = new PrismaClient({
  log: [
    {
      level: 'query',
      emit: 'event',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log(e);
});

const main = async () => {
  await prisma.user.upsert({
    where: {
      username: 'sperains',
    },

    update: {},

    create: {
      avatar: '122',
      username: 'sperains',
      nickname: 'zhangsan',
    },
  });

  const users: Prisma.UserCreateInput[] = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      username: `sperains_${i}`,
      nickname: `s_${i}`,
    });
  }

  await prisma.user.createMany({
    data: users,
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
