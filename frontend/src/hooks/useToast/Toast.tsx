/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useImperativeHandle } from 'react';
import { notification } from 'antd';
import {
    InfoCircleOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import './Toast.scss';

interface Provider {
    current: any;
}

interface Props {
    backColor?: string;
    key?: string;
    position?: string;
    dismissTime?: number;
    title?: string;
    text?: string;
    show?: boolean;
    onClose?: any;
}

export const ToastNew = React.forwardRef(function ToastNew(props: Props, ref) {
    const [api, contextHolder] = notification.useNotification();

    const messageProvider: Provider = React.useRef([]);
    const [open, setOpen] = React.useState(props.show);
    const [messageInfo, setMessageInfo] = React.useState<Props>({
        key: 'default',
        ...props,
    });

    const getIconBasedOnColor = (backColor: any) => {
        switch (backColor) {
            case 'color-warning':
                return (
                    <ExclamationCircleOutlined
                        style={{ color: '#ce3e50' }}
                        rev={''}
                    />
                );
            case 'color-success':
                return (
                    <CheckCircleOutlined
                        style={{ color: '#65c05a' }}
                        rev={''}
                    />
                );
            case 'color-error':
                return (
                    <CloseCircleOutlined
                        style={{ color: '#4d4d4d' }}
                        rev={''}
                    />
                );
            case 'color-info':
                return (
                    <InfoCircleOutlined style={{ color: '#ce3e5' }} rev={''} />
                );
            default:
                return null;
        }
    };

    const openNotification = (placement: NotificationPlacement) => {
        api.open({
            message: <span style={{ color: '#ce3e5' }}> </span>,
            description: messageInfo.text,
            placement,
            className: `notification toast ${messageInfo.position}`,
            duration: props.dismissTime,
            icon: getIconBasedOnColor(messageInfo.backColor),
        });
    };

    useEffect(() => {
        openNotification('topRight');
    }, [open]);

    const processMessage = () => {
        if (messageProvider.current.length > 0) {
            setTimeout(() => {
                setMessageInfo(messageProvider.current.shift());
                setOpen(true);
            }, 50);
        }
    };

    const pushMesage = (nextProps: any) => {
        setOpen(false);
        if (nextProps.show) {
            messageProvider.current.push({
                ...props,
                ...nextProps,
                key: new Date().getTime(),
            });
            processMessage();
        } else {
            messageProvider.current = [];
        }
    };

    useImperativeHandle(ref, () => ({
        changeToast(nextProps = {}) {
            pushMesage(nextProps);
        },
    }));

    return (
        <Fragment>
            {messageInfo !== undefined && open === true && (
                <div className={`  ${messageInfo.position}`}>
                    {contextHolder}
                </div>
            )}
        </Fragment>
    );
});
