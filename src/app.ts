// ... (imports anteriores)
import contactRoutes from './presentation/routes/contact.routes';

// ... (configuração anterior do app)

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected');
    
    app.use('/users', userRoutes);
    app.use('/contacts', contactRoutes);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => console.log('❌ Database error:', error));