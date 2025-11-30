import { User } from "@/";

async function updateOldUsers() {
  // Asignar role "user" a los que no tienen role
  await User.updateMany(
    { role: { $exists: false } }, 
    { $set: { role: "user" } }
  );
  console.log("Usuarios antiguos actualizados con role 'user'");
}

updateOldUsers();
