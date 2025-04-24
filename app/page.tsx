"use client";
import { DatePickerDemo } from "@/components/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, subDays } from "date-fns";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  birthday: z.date().min(subDays(new Date(), 5)).max(addDays(new Date(), 5)),
});

export default function Home() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: undefined,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log({ values });
  });

  return (
    <main className="p-6">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birthday</FormLabel>
                <FormControl>
                  <DatePickerDemo
                    date={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>This is your Birthday.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
