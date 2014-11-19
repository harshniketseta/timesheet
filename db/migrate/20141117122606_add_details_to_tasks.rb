class AddDetailsToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :from_date, :datetime
    add_column :tasks, :to_date, :datetime
  end
end
