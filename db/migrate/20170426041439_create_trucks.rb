class CreateTrucks < ActiveRecord::Migration[5.0]
  def change
    create_table :trucks do |t|
      t.string :address, null: false
      t.string :name, null: false
      t.string :dayshours, null: false
      t.string :food, null: false
      t.string :status, null: false
      t.string :locationdescription
      t.float :lat, null: false
      t.float :lng, null: false

      t.timestamps
    end
  end
end

# { "address":"1301 MARKET ST",
#   "applicant":"HALAL SF GYRO",
#   "dayshours":"Th/Fr/Sa:6AM-4PM",
#   "fooditems":"Gyro Sandwich: Chicken Sandwich: Lamb over rice: chicken over rice: fish sandwich & fish over rice",
#   "latitude":"37.7767362127501",
#   "locationdescription":"MARKET ST: 09TH ST \\ LARKIN ST to 10TH ST \\ FELL ST \\ POLK ST (1301 - 1399) -- SOUTH --",
#   "longitude":"-122.416394930077",
#   "status":"APPROVED"}
