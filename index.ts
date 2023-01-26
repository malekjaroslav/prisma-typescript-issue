import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
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
}
