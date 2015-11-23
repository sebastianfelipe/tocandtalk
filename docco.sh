project="."
extensions=(js json html ejs)
for path in $(find "${project}" ! -path "*/node_modules/*" ! -path "*/.*/*"); do
	dir=$(dirname "${path}")
	base_name=$(basename "${path}")
	file_name="${base_name%.*}"
	extension="${base_name##*.}"
	for ext in "${extensions}"; do
		if [ "${extension}" = "${ext}" ]; then
			dest_dir_path="docs/${dir}"
			mkdir -p "${dest_dir_path}"
			docco "${path}"
                        cp "docs/${file_name}.html" "${dest_dir_path}"
			if [ ! -e "${dest_dir_path}/doco.css"  ]; then
				cp "docs/docco.css" "${dest_dir_path}"
				cp -r "docs/public/" "${dest_dir_path}"
			fi
			rm "docs/${file_name}.html"
			echo "${dest_dir_path}"
		fi
	done
done
