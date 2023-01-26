import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  // When "take" and "orderBy" is included, typescript shows an error
  const contract = await prisma.rentContract.findUniqueOrThrow({
    where: {
      id: "",
    },
    include: {
      tenant: true,
      versions: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          tenant: true,
        },
      },
    },
  });

  contract.versions[0]?.tenant.name;

  // When "take" and "orderBy" is excluded, typescript shows correct suggestions
  const contract2 = await prisma.rentContract.findUniqueOrThrow({
    where: {
      id: "",
    },
    include: {
      tenant: true,
      versions: {
        /* take: 1,
        orderBy: {
          createdAt: "desc",
        },*/
        include: {
          tenant: true,
        },
      },
    },
  });

  contract2.versions[0]?.tenant.name;
}
