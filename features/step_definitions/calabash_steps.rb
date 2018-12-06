require 'calabash-android/calabash_steps'

Then(/^I hide my keyboard$/) do
  hide_soft_keyboard()
end


Then (/^I scroll datepicker to date "1985-01-01"/) do
# Date Format "1985-01-01"

# make sure date picker is up
should_see_date_picker()
is_picker_in_date_mode()
maxdate = picker_maximum_date_time()
target = Date.parse(target_date)
current = Date.parse(datequery())

if(maxdate<target)
  screenshot_and_raise "Target date'#{target}' is larger than maximum date'#{maxdate}' in date picker"
end

limit = 100
# => set year
  count = 0
  dir = (target.year < current.year) ? "down" : "up"
  until (target.year == Date.parse(datequery()).year) or (count==limit)  do
      date = Date.parse(datequery())
      scroll_date_component(dir, 2, date.year)
#      puts("Inside the loop1 '#{count}'=> '#{date.year}'" )
    count += 1
  end

# => set month
  count = 0
  dir = (target.month < current.month) ? "down" : "up"
  until (target.month == Date.parse(datequery()).month) or (count==limit)  do
      date = Date.parse(datequery())
      scroll_date_component(dir, 0, date.month)
#      puts("Inside the loop2 '#{count}'=> '#{date.month}'" )
    count += 1
  end

# => set day
  count = 0
  dir = (target.day < current.day) ? "down" : "up"
  until (target.day == Date.parse(datequery()).day) or (count==limit)  do
      date = Date.parse(datequery())
      scroll_date_component(dir, 1, date.day)
#      puts("Inside the loop3 '#{count}'=> '#{date.day}'" )
    count += 1
  end

end

#########################################################

# => ##### Date picker helper methods. #####

    def scroll_date_component(direction, column, component)
      if(column==0)
        # => Month scroll needs the month name string
        if (direction.eql? "up")
          month_str = Date::MONTHNAMES[component+1]
          touch("pickerView scrollView index:#{column} label text:'#{month_str}'")
        elsif (direction.eql? "down")
          month_str = Date::MONTHNAMES[component-1]
          touch("pickerView scrollView index:#{column} label text:'#{month_str}'")
        end
      else
        # => Day and year scrolls are numeric 
        if (direction.eql? "up")
          touch("pickerView scrollView index:#{column} label text:'#{component + 1}'")
        elsif (direction.eql? "down")
          touch("pickerView scrollView index:#{column} label text:'#{component - 1}'")
        end
      end
      sleep(0.3)
    end

def datequery()
   return query("datePicker","date").first 
end

def should_see_date_picker ()
  if query("datePicker", :date).empty?
    screenshot_and_raise "Could not find date picker"
  end
end

def is_picker_in_date_mode()
  res = query("datePicker", :datePickerMode)
  screenshot_and_raise "expected to see a date picker" if res.empty?
  screenshot_and_raise "expected to see UIDatePickerModeDate" if res.first!=1
end

def picker_maximum_date_time()
  res = query("datePicker", :maximumDate)
  screenshot_and_raise "expected to see a date picker" if res.empty?
  return DateTime.parse(res.first) if (res.first)
end


