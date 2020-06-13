class Truck < ApplicationRecord

  validates :type, :location, :note, :finder, :lat, :lng, presence: true

  def self.in_bounds(bounds)
    self.where("lat < ?", bounds[:northEast][:lat])
        .where("lat > ?", bounds[:southWest][:lat])
        .where("lng > ?", bounds[:southWest][:lng])
        .where("lng < ?", bounds[:northEast][:lng])
  end

  # DAY_TO_DB = {
  #   "Sunday" => "Su",
  #   "Monday" => "Mo",
  #   "Tuesday" => "Tu",
  #   "Wednesday" => "We",
  #   "Thursday" => "Th",
  #   "Friday" => "Fr",
  #   "Saturday" => "Sa"
  # }

  # def self.in_days(days)
  #   new_days = days.map{|day| DAY_TO_DB[day]}
  # end

  # def self.in_days_and_time(day, time)
  #   # days = ["Monday", "Tuesday", "Wednesday"]
  #   # time = "breakfast"
  #   timerange = to_times(time)
  #   days = to_days(day)
  #   # days = ["D1", "D2", "D3"]
  #   # timerange = [4, 5, 6, 7, 8, 9, 10]
  #
  #   # string to compare = " D0 D1 D2 D3 D4 D5 2 3 4 5 6 , D6 D7 3 4 5 6 7 8 9 "
  #
  # end
  #
  # def to_days(day)
  #   day.map{|el| DAY_TO_D[el]}
  # end
  #
  # def to_times(time)
  #   case time
  #   when "breakfast"
  #     (4..10).to_a
  #   when "lunch"
  #     (10..15).to_a
  #   when "dinner"
  #     (15..21).to_a
  #   when "latenight"
  #     [21, 22, 23, 0, 1, 2, 3]
  #   else
  #     (0..24).to_a
  #   end
  # end

end
