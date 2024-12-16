'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Camera, Loader2, Lock, Mail, Phone, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

import { ToastAction } from "@/components/ui/toast"
import { registerUser } from "@/app/services/api/auth"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "El nombre de usuario debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un email válido.",
  }),
  phone: z.string().min(10, {
    message: "El teléfono debe tener al menos 10 dígitos.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
  profileImageUrl: z.any().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function RegistroForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imagenPreview, setImagenPreview] = useState<string>("")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      profileImageUrl: undefined,
    },
  })

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagenPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
    form.setValue("profileImageUrl", e.target.files || null)
  }

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("username", values.username)
      formData.append("email", values.email)
      formData.append("phone", values.phone)
      formData.append("password", values.password)

      if (values.profileImageUrl instanceof FileList && values.profileImageUrl.length > 0) {
        formData.append("file", values.profileImageUrl[0])
      }

      await registerUser(formData)
      
      toast({
        title: "¡Registro exitoso!",
        description: "El usuario ha sido registrado correctamente.",
      })

      router.push("/pages/users")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Hubo un error al registrar el usuario.",
        action: (
          <ToastAction altText="Reintentar" onClick={() => onSubmit(values)}>
            Reintentar
          </ToastAction>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Registro de Usuario
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Ingrese sus datos para crear una nueva cuenta y unirse a nuestra
            comunidad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <motion.div
                className="flex justify-center mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <FormField
                  control={form.control}
                  name="profileImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="profileImageInput"
                        className="cursor-pointer"
                      >
                        <Avatar className="w-32 h-32 border-4 border-primary hover:border-primary/80 transition-colors">
                          <AvatarImage src={imagenPreview} />
                          <AvatarFallback className="bg-muted">
                            <Camera className="w-12 h-12 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      </FormLabel>
                      <Input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleImagenChange(e)
                          field.onChange(e.target.files)
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <AnimatePresence>
                {(["username", "email", "phone", "password"] as const).map((fieldName, index) => (
                  <motion.div
                    key={fieldName}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {fieldName === "username"
                              ? "Nombre de usuario"
                              : fieldName === "email"
                              ? "Correo electrónico"
                              : fieldName === "phone"
                              ? "Teléfono"
                              : "Contraseña"}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={fieldName === "password" ? "password" : fieldName === "email" ? "email" : fieldName === "phone" ? "tel" : "text"}
                                placeholder={fieldName === "username" ? "JuanPerez" : fieldName === "email" ? "juan@ejemplo.com" : fieldName === "phone" ? "1234567890" : "******"}
                                className="pl-10"
                              />
                              {fieldName === "username" && (
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                              )}
                              {fieldName === "email" && (
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                              )}
                              {fieldName === "phone" && (
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                              )}
                              {fieldName === "password" && (
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full text-lg py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    "Completar Registro"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

