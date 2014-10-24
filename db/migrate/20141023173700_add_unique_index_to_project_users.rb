class AddUniqueIndexToProjectUsers < ActiveRecord::Migration
  def change
    add_index :project_users, [:project_id, :user_id], unique: true
  end
end
