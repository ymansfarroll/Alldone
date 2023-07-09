'use strict';

/**
 * Module dependencies.
 * @private
 */

 import mongoose from 'mongoose';
 import { expect } from 'chai';
 
import { personalUserInformationUnitSmaples } from './samples/unit.samples.js';
 
import UserModel from '../lib/models/User.models.js';    

/**
 * Unit test environment.
 * @private
 */

describe( 'Unit tests for User Model:\n', () => {
    
    afterEach( () => { // Global for both User and Task models.
    
        // Drop all the existing data inside each collection.
        let collections = mongoose.connection.collections;
    
        Object.keys(collections).forEach( (collection) => {
            collections[collection].deleteMany();
        });
    });

    it( 'Create and save a user with valid specification, \n \
                                                          \n \
                            it should be returned a user instance.\n', async () => {    
                    
        const userCreationResponse = 
        
                    await UserModel.create( personalUserInformationUnitSmaples.VALID_PERSONAL_USER_INFORMATION );
                                                
        expect(userCreationResponse).to.be.instanceof(UserModel);                       
    });  
    
    it( 'Create and save a user without required property, \n \
                                                           \n \
                            it should be returned a mongoose validation error instance.\n', async () => {  
        
        let userCreationResponse;

        try {   
            await UserModel.create( personalUserInformationUnitSmaples.PERSONAL_USER_INFORMATION_WITHOUT_REQUIRED_FIELD ); 
        } catch (err) {
            userCreationResponse = err; 
        }

        const REQUIRED_FIELD = 'username'; 

        expect(userCreationResponse).to.be.instanceOf(mongoose.Error.ValidationError); 
        expect(userCreationResponse.errors[REQUIRED_FIELD]).to.be.instanceOf(mongoose.Error.ValidatorError);
        expect(userCreationResponse.errors[REQUIRED_FIELD].kind).to.be.equal('required');                    
    });

    it( 'Create and save a user with invalid specification property, \n \
                                                                     \n \
                            it should be returned a mongoose validation error instance.\n', async () => {

        let userCreationResponse;

        try {   
            let a = await UserModel.create( personalUserInformationUnitSmaples.PERSONAL_USER_INFORMATION_WITH_INVALID_FIELD ); 
        } catch (err) {
            userCreationResponse = err; 
        }   
        
        const INVALID_PROPERTY = 'email';

        expect(userCreationResponse).to.be.instanceOf(mongoose.Error.ValidationError); 
        expect(userCreationResponse.errors[INVALID_PROPERTY]).to.be.instanceOf(mongoose.Error.ValidatorError);
        expect(userCreationResponse.errors[INVALID_PROPERTY].kind).to.be.equal('regexp');        
    });    

    it( 'Create and save user with extra non-model properties, \n \
                                                               \n \
                            it should create the user being ignored the non-model properties\n', async () => {

        const userCreationResponse = 
        
                    await UserModel.create( personalUserInformationUnitSmaples.CONTAMINATED_PERSONAL_USER_INFORMATION );   
        
        expect(userCreationResponse.noUserModelProperty).to.be.undefined;
    });    
});

