import { SALT_OR_ROUND } from '../src/auth/constans';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { IdentityType } from '../src/auth';

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
  const user = await prisma.user.upsert({
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

  await prisma.userIdentity.upsert({
    where: {
      user_identity_type: {
        user_id: user.id,
        identity_type: IdentityType.Account,
      },
    },
    update: {
      user_id: user.id,
      identifier: 'sperains',
      credential: await hash('1300', SALT_OR_ROUND),
    },
    create: {
      user_id: user.id,
      identifier: 'sperains',
      credential: await hash('1300', SALT_OR_ROUND),
    },
  });

  // const users: Prisma.UserCreateInput[] = [];

  // for (let i = 0; i < 100; i++) {
  //   users.push({
  //     username: `sperains_${i}`,
  //     nickname: `s_${i}`,
  //   });
  // }

  // await prisma.user.createMany({
  //   data: users,
  // });
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
