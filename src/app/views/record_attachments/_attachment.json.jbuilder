if attachment # Avoid nil attachment
  json.id attachment.id
  json.title attachment.title
  json.caption "#{attachment.caption}"
  json.credit "#{attachment.credit}"
  json.attachable_type attachment.attachable_type
  json.type attachment.attachable_type.split("::").last.downcase
  json.content_type attachment.has_file? ? attachment.file.blob.content_type : nil

  if attachment.has_file?
    json.url attachment.has_image? ? url_for(attachment.file.variant(resize: "1200x1200")) : url_for(attachment.file)
  elsif attachment.has_url?
    json.url attachment.url
  end

  json.attachable_class attachment.attachable.class
  json.attachable_data_class attachment.attachable.try(:data).class
  json.attachable attachment.attachable.data

  if attachment.has_image?
    json.is_primary attachment.is_primary?
  end
end