class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name, limit: 40
      t.integer :parent_project_id

      t.timestamps
    end
  end
end
