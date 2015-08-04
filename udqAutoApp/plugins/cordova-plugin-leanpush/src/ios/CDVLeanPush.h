#import <Cordova/CDV.h>

#define PROP_KEY_LEANCLOUD_APP_ID @"so0w0vlsvdiwznl3kjeo5uha9eqxhixat1k1eik4bj2jv3tx"
#define PROP_KEY_LEANCLOUD_APP_KEY @"a4sg6h1gqyfwxj91m6i93amk07i50qgsuqebo0jc4cs01d8u"

@interface CDVLeanPush:CDVPlugin

@property (nonatomic, strong) NSString *leancloudAppId;
@property (nonatomic, strong) NSString *leancloudAppKey;

@property (nonatomic, strong) NSString *cacheResult;
@property (nonatomic, strong) NSString *callback;

- (void)subscribe:(CDVInvokedUrlCommand *)command;
- (void)unsubscribe:(CDVInvokedUrlCommand *)command;
- (void)clearSubscription:(CDVInvokedUrlCommand *)command;
- (void)onNotificationReceived:(CDVInvokedUrlCommand *)command;
- (void)getInstalltion:(CDVInvokedUrlCommand *)command;
- (void)getCacheResult:(CDVInvokedUrlCommand *)command;
- (void)sendJson:(NSDictionary *)command statusIs:(NSString *)status;


@end
