class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :project_id
      t.integer :assigned_id
      t.integer :assignor_id
      t.string :title
      t.string :description
      t.integer :priority
      t.integer :estimated_time_for_completion
      t.integer :time_for_completion
      t.integer :state

      t.timestamps
    end
  end
end
