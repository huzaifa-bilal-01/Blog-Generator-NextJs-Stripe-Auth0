# Use the official Node.js image as the base image
FROM node:19.5.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy your Node.js application files into the container
COPY . .

# Set the environment variables
ENV OPENAI_API_KEY=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
ENV AUTH0_SECRET='b4c5107c3e4fc67e8d2323118a8e36bbc52a515ffc0a2afb5429126a4aed0ccc'
ENV AUTH0_BASE_URL='http://localhost:3000'
ENV AUTH0_ISSUER_BASE_URL='https://dev-20jb5cq52g4envdt.us.auth0.com'
ENV AUTH0_CLIENT_ID='WY5IlvLBisO1yA6AkI5ep0H7L46Wqops'
ENV AUTH0_CLIENT_SECRET='f0v4nHlF_ydsDr0fx2NNPG62tWLafcOATwdTk8WBD68jHsn3Kc7XX0s6PF13mqyS'
ENV MONGODB_URI=mongodb+srv://aifu:42662@cluster0.txi0em3.mongodb.net/?retryWrites=true&w=majority
ENV STRIPE_SECRET_KEY=sk_test_51NRVs6ANcf0mtg3nM38kMbGsBxfKiAaz0tgRiNVQGOx2e34qamRgHuG0BGk2vYyqxHwQxwhYluBg9tlaFYn4jWea00pUS4MSvr
ENV STRIPE_PRODUCT_PRICE_ID=price_1NRVwmANcf0mtg3n6n87dvGg
ENV STRIPE_WEBHOOK_SECRET=whsec_28c2db0f2af1c578b9e501b9d530db2edd64ab225e0fcfef577f4cc98ebfddbb

# Install dependencies and build the application
RUN npm install
RUN npm run build

# Start the Node.js application
CMD ["npm", "start"]
