import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  // auth: true,
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify Account</a>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,
      // admin: {
      //   // to allow nobody to see this field
      //   condition: () => false,

      //   // to allow only admins to see this field
      //   // condition: (req) => req.user.role === "admin",
      // },
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};
