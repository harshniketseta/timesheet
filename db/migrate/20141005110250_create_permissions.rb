class CreatePermissions < ActiveRecord::Migration
  def change
    create_table :permissions do |t|
      t.string :name, limit: 100
      t.timestamps
    end
  end
end
