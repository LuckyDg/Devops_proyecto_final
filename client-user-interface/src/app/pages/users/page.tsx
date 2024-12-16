"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Trash2, UserPlus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { getUsers } from "@/app/services/api/user";

interface Usuario {
  id: string;
  username: string;
  email: string;
  phone: string;
  profileImageUrl: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsers();
        setUsuarios(data.users);
        setFilteredUsuarios(data.users);
      } catch {
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios.",
          variant: "destructive",
        });
      }
    };

    fetchUsuarios();
  }, [toast]);

  useEffect(() => {
    if (usuarios.length > 0) {
      const results = usuarios.filter(
        (usuario) =>
          usuario.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsuarios(results);
    }
  }, [searchTerm, usuarios]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/auth/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(nuevosUsuarios);
        setFilteredUsuarios(nuevosUsuarios);
        toast({
          title: "Usuario eliminado",
          description: "El usuario ha sido eliminado correctamente.",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar el usuario.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Hubo un problema al eliminar el usuario.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-0"
    >
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <CardTitle className="text-2xl font-bold">Usuarios Registrados</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar usuarios..."
                className="pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => router.push("/")} className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Nuevo Usuario</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Perfil</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Teléfono</TableHead>
                  <TableHead className="hidden sm:table-cell">Rol</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredUsuarios.length > 0 ? (
                    filteredUsuarios.map((usuario, index) => (
                      <motion.tr
                        key={usuario.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group"
                      >
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={usuario.profileImageUrl} />
                            <AvatarFallback>
                              {usuario.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{usuario.username}</TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{usuario.phone}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {usuario.roles[0]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2 group-hover:opacity-100 transition-opacity">
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete(usuario.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No hay usuarios para mostrar.
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
