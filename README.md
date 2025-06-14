
# Image Resizer project

A Image resizer  for uploading, managing, and processing images with Node.js, Express, and TypeScript.

## Features

- 📁 Image upload 
- abilty to resize a resized image by coping the orginal image and deleting it if it was the last image (Important Note: i didn't add this feature in the ui because time is almost over)
- ✏️ Image metadata editing (name)
- 🔍 Retrieve all images or single image by ID 
- ⚡ On-demand image resizing
- 🗑️ Image deletion

i also used sql-lite 3

## API Endpoints

| Method | Endpoint       | Description                          | Parameters/Body                     |
|--------|----------------|--------------------------------------|-------------------------------------|
| GET    | `/`            | Get all images                       | -                                   |
| GET    | `/:id`         | Get single image by ID               | `id` (URL parameter)               |
| POST   | `/upload`      | Upload new image                     | `file` (FormData), `name`          |
| PUT    | `/:id`         | Edit image name                      | `id` (URL), `{name: string}` (JSON)|
| DELETE | `/:id`         | Delete image                         | `id` (URL parameter)               |
| POST   | `/resize`      | Upload and resize image              | `file`, `width`, `height` (FormData)|



## 🚀 Getting Started


### 1. Backend Setup (Port 8000)
```bash
# Clone repository
git clone 
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Server will run on http://localhost:8000


# From project root
cd frontend

# Install dependencies
npm install

# Start React development server
npm run dev

# Frontend will open at http://localhost:5173