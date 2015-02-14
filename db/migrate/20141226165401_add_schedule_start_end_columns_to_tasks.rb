class AddScheduleStartEndColumnsToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :scheduled_start, :date
    add_column :tasks, :scheduled_end, :date
  end
end
