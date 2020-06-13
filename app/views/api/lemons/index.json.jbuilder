@lemons.each do |lemon|
  json.partial! "api/lemons/lemon", lemon: lemon
end
