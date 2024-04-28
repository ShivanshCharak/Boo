
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import FileUploader from '../shared/FileUploader'
import { PostValidation } from '@/lib/validations'
 


// 2. Define a submit handler.
function onSubmit(values: z.infer<typeof PostValidation>) {

    console.log(values)
  }


const PostForm = ({post}:any) => {
    // const {mutate} = useCreate
    // const
    const form = useForm<z.infer<typeof PostValidation>>({
      resolver: zodResolver(PostValidation),
      defaultValues: {
        caption: post?post?.caption:"",
        file:[],
        location:post?post?.location:"",
        tags:post?post.tags.join(','):""
      },
    })
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Caption</FormLabel>
            <FormControl>
              <Textarea className='shad-textarea custom-scrollbar' placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage className='shad-form_message'/>
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Caption</FormLabel>
            <FormControl>
             <FileUploader
                fieldChange={field.onChange}
                mediaUrl={post?.imageUrl}
             />
            </FormControl>
            <FormMessage className='shad-form_message'/>
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add location</FormLabel>
            <FormControl>
              <Input type='text' {...field} className='shad-input'/>
            </FormControl>
            <FormMessage className='shad-form_message'/>
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add tags(Separated by comma ",")</FormLabel>
            <FormControl>
              <Input type='text' {...field} className='shad-input'
              placeholder='Art,Expression etc..'/>
            </FormControl>
            <FormMessage className='shad-form_message'/>
          </FormItem>
        )}
      />
      <Button type="button" className='shad-button_dark_4'>Cancel</Button>
      <Button type="submit" className='shad-button_primary whitespace-nowrap'>Submit</Button>
    </form>
  </Form>
  )
}

export default PostForm