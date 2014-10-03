class CreateServerConfigs < ActiveRecord::Migration
  def change
    create_table :server_configs do |t|

      t.timestamps
    end
  end
end
