if (module.hot) {
  const context = require.context(
    "mocha-loader!./", // Process through mocha-loader
    false, // Skip recursive processing
    /\.spec.js$/ // Pick only files ending with .test.js
  );
  console.log(context);
  // Execute each test suite
  context.keys().forEach(context);
}