"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Upload, Camera } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const countries = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "China", value: "cn" },
  { label: "India", value: "in" },
  { label: "Brazil", value: "br" },
  { label: "Nepal", value: "br" },
]

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  placeOfBirth: z.string().min(2, {
    message: "Place of birth is required.",
  }),
  currentNationality: z.string({
    required_error: "Please select your current nationality.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  state: z.string().min(2, {
    message: "State/Province is required.",
  }),
  postalCode: z.string().min(2, {
    message: "Postal code is required.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  // Parent information
  fatherFirstName: z.string().min(2, {
    message: "Father's first name must be at least 2 characters.",
  }),
  fatherLastName: z.string().min(2, {
    message: "Father's last name must be at least 2 characters.",
  }),
  fatherNationality: z.string({
    required_error: "Please select father's nationality.",
  }),
  fatherDateOfBirth: z.date({
    required_error: "Father's date of birth is required.",
  }),
  motherFirstName: z.string().min(2, {
    message: "Mother's first name must be at least 2 characters.",
  }),
  motherLastName: z.string().min(2, {
    message: "Mother's last name must be at least 2 characters.",
  }),
  motherNationality: z.string({
    required_error: "Please select mother's nationality.",
  }),
  motherDateOfBirth: z.date({
    required_error: "Mother's date of birth is required.",
  }),
  // Citizenship information
  reasonForApplication: z.string().min(10, {
    message: "Please provide a reason for your application.",
  }),
  residencyYears: z.string().min(1, {
    message: "Please enter years of residency.",
  }),
  criminalRecord: z.boolean(),
  criminalRecordDetails: z.string().optional(),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export default function CitizenshipRegistrationForm() {
  const [open, setOpen] = useState(false)
  const [criminalRecord, setCriminalRecord] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      email: "",
      phone: "",
      fatherFirstName: "",
      fatherLastName: "",
      fatherNationality: "",
      motherFirstName: "",
      motherLastName: "",
      motherNationality: "",
      reasonForApplication: "",
      residencyYears: "",
      criminalRecord: false,
      criminalRecordDetails: "",
      termsAgreed: false,
    },
  })

  function onSubmit(values) {
    console.log(values)
    // In a real application, you would send this data to your backend
    alert("Form submitted successfully! Check console for form data.")
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-10 bg-blue-50 my-10">
      <Card className=" w-10/12 mx-auto border-blue-200 shadow-lg">
        <CardHeader className="space-y-1 bg-[#8881e6] text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Citizenship Registration Application</CardTitle>
          <CardDescription className="text-blue-100">
            Complete the form below to apply for citizenship. All fields marked with an asterisk (*) are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 border-b border-blue-200 pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} className="border-blue-200 focus:border-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input placeholder="David" {...field} className="border-blue-200 focus:border-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} className="border-blue-200 focus:border-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal border-blue-200",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="placeOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Place of Birth *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="New York, USA"
                            {...field}
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="currentNationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Nationality *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-blue-200 focus:border-blue-500">
                            <SelectValue placeholder="Select your current nationality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Photo Upload Section */}
                <div className="mt-6 border rounded-md p-4 border-blue-200 bg-blue-50">
                  <h4 className="font-medium mb-2 text-blue-700">Passport Photo Upload *</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please upload a recent passport-style photograph. The photo must be:
                  </p>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Taken within the last 6 months</li>
                    <li>In color with a plain white background</li>
                    <li>Showing your full face, front view with a neutral expression</li>
                    <li>Between 2x2 inches (51x51 mm) in size</li>
                  </ul>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center border-blue-300 bg-blue-50 w-full md:w-1/2">
                      <Camera className="h-8 w-8 text-blue-500 mb-2" />
                      <p className="text-sm font-medium text-blue-700">Upload Passport Photo</p>
                      <p className="text-xs text-muted-foreground mt-1">JPG or PNG (max 5MB)</p>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="photo-upload"
                        onChange={handlePhotoUpload}
                      />
                      <label htmlFor="photo-upload">
                        <Button variant="outline" size="sm" className="mt-4 border-blue-300 hover:bg-blue-100" asChild>
                          <span>Select Photo</span>
                        </Button>
                      </label>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center">
                      {photoPreview ? (
                        <div className="relative">
                          <img
                            src={photoPreview || "/placeholder.svg"}
                            alt="Passport photo preview"
                            className="w-32 h-40 object-cover border-4 border-blue-200 rounded"
                          />
                          <p className="text-xs text-center mt-2 text-blue-600">Photo Preview</p>
                        </div>
                      ) : (
                        <div className="w-32 h-40 bg-blue-100 border-4 border-blue-200 rounded flex items-center justify-center">
                          <p className="text-xs text-blue-500 text-center px-2">Photo preview will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 border-b border-blue-200 pb-2">Parents Information</h3>

                <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                  <h4 className="font-medium mb-4 text-blue-700">Father's Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fatherFirstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} className="border-blue-200 focus:border-blue-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fatherLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} className="border-blue-200 focus:border-blue-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="fatherNationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                                <SelectValue placeholder="Select nationality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fatherDateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal border-blue-200",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                  <h4 className="font-medium mb-4 text-blue-700">Mother's Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="motherFirstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane" {...field} className="border-blue-200 focus:border-blue-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="motherLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} className="border-blue-200 focus:border-blue-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="motherNationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                                <SelectValue placeholder="Select nationality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="motherDateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal border-blue-200",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 border-b border-blue-200 pb-2">Contact Information</h3>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St, Apt 4B"
                          {...field}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} className="border-blue-200 focus:border-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province *</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} className="border-blue-200 focus:border-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code *</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} className="border-blue-200 focus:border-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-blue-200 focus:border-blue-500">
                            <SelectValue placeholder="Select your country of residence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 (555) 123-4567"
                            {...field}
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 border-b border-blue-200 pb-2">
                  Citizenship Information
                </h3>
                <FormField
                  control={form.control}
                  name="reasonForApplication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Application *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please explain why you are applying for citizenship..."
                          className="min-h-[100px] border-blue-200 focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="residencyYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Residency in the Country *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="5"
                          {...field}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="criminalRecord"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-blue-200 bg-blue-50">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                            setCriminalRecord(checked)
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Do you have a criminal record?</FormLabel>
                        <FormDescription>
                          Please check this box if you have ever been convicted of a crime.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {criminalRecord && (
                  <FormField
                    control={form.control}
                    name="criminalRecordDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Criminal Record Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide details about your criminal record..."
                            className="min-h-[100px] border-blue-200 focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="space-y-4">
                  <div className="border rounded-md p-4 border-blue-200 bg-blue-50">
                    <h4 className="font-medium mb-2 text-blue-700">Document Upload</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please upload scanned copies of the following documents:
                    </p>
                    <ul className="list-disc pl-5 mb-4 text-sm">
                      <li>Valid passport</li>
                      <li>Birth certificate</li>
                      <li>Proof of residency</li>
                    </ul>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center border-blue-300">
                        <Upload className="h-8 w-8 text-blue-500 mb-2" />
                        <p className="text-sm font-medium text-blue-700">Upload Passport</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF or JPG (max 5MB)</p>
                        <Button variant="outline" size="sm" className="mt-4 border-blue-300 hover:bg-blue-100">
                          Select File
                        </Button>
                      </div>
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center border-blue-300">
                        <Upload className="h-8 w-8 text-blue-500 mb-2" />
                        <p className="text-sm font-medium text-blue-700">Upload Birth Certificate</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF or JPG (max 5MB)</p>
                        <Button variant="outline" size="sm" className="mt-4 border-blue-300 hover:bg-blue-100">
                          Select File
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="termsAgreed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-blue-200 bg-blue-50">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Terms and Conditions *</FormLabel>
                        <FormDescription>
                          I hereby declare that the information provided in this application is true and correct. I
                          understand that providing false information may result in the rejection of my application and
                          possible legal consequences.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Submit Application
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t px-6 py-4 border-blue-200 bg-blue-50">
          <p className="text-sm text-blue-600">
            Your application will be reviewed by the immigration department. The processing time is typically 3-6
            months. You will be notified via email about the status of your application.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
